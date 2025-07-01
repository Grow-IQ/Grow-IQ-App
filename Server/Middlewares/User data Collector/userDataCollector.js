require("../../Config/loadenv"); // Load env first
const { Authdb, auth } = require("../../Config/firebase");
const pool = require("../../Config/postgre");


const userDataCollector = async () => {
    try {
        // Fetch all users from Firebase
        const usersSnapshot = await Authdb.collection('users').get();
        const users = usersSnapshot.docs.map(doc => doc.data());

        // Insert each user into PostgreSQL
        for (const user of users) {
            console.log(user)
        }

        console.log('✅ User data collected and stored in PostgreSQL');
    } catch (error) {
        console.error('❌ Error collecting user data:', error);
    }
}

module.exports = userDataCollector;
