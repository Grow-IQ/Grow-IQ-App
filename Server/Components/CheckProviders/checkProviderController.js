const pool = require('../../Config/postgre')

const checkProviderController = {
    getProvider: async (req, res) => {
        try {
            const { email } = req.query;
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            if (email) {
                // Check Google Auth Users
                const googleUser = await pool.query('SELECT * FROM public.google_auth_users WHERE email=$1', [email]);
                if (googleUser.rows.length > 0) {
                    return res.status(200).json({ provider: 'google.com' });
                }

                // Check Email Auth Users
                const emailUser = await pool.query('SELECT * FROM public.email_auth_users WHERE email=$1', [email]);
                if (emailUser.rows.length > 0) {
                    return res.status(200).json({ provider: 'password' });
                }

            }
            return res.status(404).json({ error: 'User not found' });
        } catch (error) {
            console.error('❌ Error checking provider:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = checkProviderController;