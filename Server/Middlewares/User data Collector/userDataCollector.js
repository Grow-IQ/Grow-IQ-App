require("../../Config/loadenv"); // Load env first
const { Authdb } = require("../../Config/firebase");
const pool = require("../../Config/postgre");

// Upsert user into PostgreSQL
async function upsertUser(user) {
    try {
        const createdAt = parseInt(user.createdAt, 10) || Date.now();
        const lastLoginAt = parseInt(user.lastLoginAt, 10) || Date.now();

        if (user.provider === 'google.com') {
            await pool.query(`
                INSERT INTO public.google_auth_users
                    (id, email, display_name, photo_url, email_verified, created_at, last_login_at)
                VALUES
                    ($1, $2, $3, $4, $5, to_timestamp($6 / 1000.0), to_timestamp($7 / 1000.0))
                ON CONFLICT (id) DO UPDATE SET
                    display_name = EXCLUDED.display_name,
                    photo_url = EXCLUDED.photo_url,
                    email_verified = EXCLUDED.email_verified,
                    last_login_at = to_timestamp($7 / 1000.0),
                    updated_at = NOW()
            `, [
                user.uid,
                user.email,
                user.displayName || null,
                user.photoURL || null,
                user.emailVerified || false,
                createdAt,
                lastLoginAt
            ]);
        } else if (user.provider === 'password') {
            await pool.query(`
                INSERT INTO public.email_auth_users 
                    (id, email, first_name, last_name, phone, country_code, email_verified, created_at, last_login_at,password)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, to_timestamp($8 / 1000.0), to_timestamp($9 / 1000.0),$10)
                ON CONFLICT (id) DO UPDATE SET
                    email = EXCLUDED.email,
                    first_name = EXCLUDED.first_name,
                    last_name = EXCLUDED.last_name,
                    phone = EXCLUDED.phone,
                    country_code = EXCLUDED.country_code,
                    email_verified = EXCLUDED.email_verified,
                    last_login_at = to_timestamp($9 / 1000.0),
                    updated_at = NOW()
            `, [
                user.uid,
                user.email,
                user.firstName || null,
                user.lastName || null,
                user.phone || null,
                user.countryCode || null,
                user.emailVerified || false,
                createdAt,
                lastLoginAt,
                user.password || null
            ]);
        }
    } catch (error) {
        console.error('❌ Error upserting user into PostgreSQL:', error);
    }
}

// Delete user from PostgreSQL
async function deleteUser(user) {
    try {
        if (user.provider === 'google.com') {
            await pool.query('DELETE FROM public.google_auth_users WHERE id=$1', [user.uid]);
        } else if (user.provider === 'password') {
            await pool.query('DELETE FROM public.google_auth_users WHERE id=$1', [user.uid]);
        }
    } catch (error) {
        console.error('❌ Error deleting user from PostgreSQL:', error);
    }
}

// One-time migration at startup
async function initialMigration() {
    console.log('📥 Running initial migration...');
    const snapshot = await Authdb.collection('users').get();
    for (const doc of snapshot.docs) {
        const user = doc.data();
        await upsertUser(user);
    }
    console.log('✅ Initial migration complete.');
}

// Real-time sync listener
function startUserRealtimeSync() {
    console.log('📡 Starting Firestore real-time sync...');
    Authdb.collection('users').onSnapshot(
        async (snapshot) => {
            for (const change of snapshot.docChanges()) {
                const user = change.doc.data();
                if (change.type === 'added' || change.type === 'modified') {
                    // console.log('🔄 User added/modified:', user.email);
                    await upsertUser(user);
                } else if (change.type === 'removed') {
                    console.log('🗑️ User removed:', user.email);
                    await deleteUser(user);
                }
            }
        },
        (error) => {
            console.error('❌ Real-time listener error:', error);
        }
    );
}

// Exported runner
async function runUserDataCollector() {
    await initialMigration();      // Run once at startup
    startUserRealtimeSync();      // Start real-time sync
}

module.exports = runUserDataCollector;
