import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';

// Custom metrics
const loginSuccess = new Rate('login_success');
const dataFetchSuccess = new Rate('data_fetch_success');
const transactionSuccess = new Rate('transaction_success');
const errorRate = new Rate('errors');
const totalRequests = new Counter('total_requests');

const SUPABASE_URL = 'https://mcvdeawuifewmhmbsmrb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jdmRlYXd1aWZld21obWJzbXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MTUzMzksImV4cCI6MjA0NzE5MTMzOX0.6najMORPHZ84iIptZ9PPJJq9GU0bbB1iaykUfkseGus';

export const options = {
    stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'login_success': ['rate>0.95'],
        'data_fetch_success': ['rate>0.95'],
        'transaction_success': ['rate>0.95'],
        'errors': ['rate<0.1'],
    },
};

const baseHeaders = {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
};

export default function () {
    // Based on fetchUserData.jsx authentication flow
    try {
        totalRequests.add(1);

        // Get session first (lines 7-8 in fetchUserData.jsx)
        const sessionRes = http.get(
            `${SUPABASE_URL}/auth/v1/session`,
            { headers: baseHeaders }
        );

        // Login attempt
        const loginPayload = JSON.stringify({
            email: 'khang2@gmail.com',
            password: 'khangg'
        });

        const loginRes = http.post(
            `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
            loginPayload,
            {
                headers: baseHeaders,
                timeout: '30s'
            }
        );

        const loginSuccessful = check(loginRes, {
            'login successful': (r) => r.status === 200 && r.json('access_token') !== undefined,
        });
        loginSuccess.add(loginSuccessful);

        if (loginSuccessful) {
            const { access_token, user } = JSON.parse(loginRes.body);
            const authHeaders = {
                ...baseHeaders,
                'Authorization': `Bearer ${access_token}`
            };

            // Fetch client data (based on fetchUserData.jsx lines 13-17)
            const clientRes = http.get(
                `${SUPABASE_URL}/rest/v1/client?client_id=eq.${user.id}&select=username`,
                { headers: authHeaders }
            );

            // Fetch financial data (based on financeService.jsx lines 3-42)
            const currentDate = new Date();
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

            // Fetch expenses
            const expensesRes = http.get(
                `${SUPABASE_URL}/rest/v1/expense?select=*&client_id=eq.${user.id}&date=gte.${firstDayOfMonth}&date=lte.${lastDayOfMonth}`,
                { headers: authHeaders }
            );

            const dataFetched = check(expensesRes, {
                'financial data fetched': (r) => r.status === 200,
            });
            dataFetchSuccess.add(dataFetched);

            // Create transaction (based on EditDeleteData.jsx lines 43-64)
            const transactionPayload = JSON.stringify({
                amount: 100,
                category: 'Food',
                client_id: user.id,
                date: new Date().toISOString()
            });

            const transactionRes = http.post(
                `${SUPABASE_URL}/rest/v1/expense`,
                transactionPayload,
                { headers: authHeaders }
            );

            const transactionCreated = check(transactionRes, {
                'transaction created': (r) => r.status === 201,
            });
            transactionSuccess.add(transactionCreated);
        }

    } catch (e) {
        console.error(e);
        errorRate.add(1);
    }

    sleep(3);
}