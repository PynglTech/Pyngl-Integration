import axios from "axios";

// 🔴 PASTE YOUR LONG TOKEN HERE (Keep it inside quotes)
const RML_TOKEN ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGVtbyIsInVzZXJuYW1lIjoiZGVtbyIsImV4cCI6MTc2NTI4NTY2MCwib3JpZ19pYXQiOjE3NjM5ODk2NjAsImN1c3RvbWVyX2lkIjoiOWlyNURnN2J2c0NBIiwic2VuZF9tZXNzYWdlIjpmYWxzZSwicmVzZWxsZXIiOmZhbHNlfQ.nFvi38C_F2s_ZKKM1_J6xwr2AvIAkfESdHu8mdmWeJU";

// 🔴 YOUR PHONE NUMBER (Format: +91XXXXXXXXXX)
const TEST_PHONE = "+919574158474";
async function testReadAccess() {
    try {
        // This endpoint just CHECKS capability, doesn't SEND a message
        // Note: Use a real number like +919574158474
        const url = "https://apis.rmlconnect.net/rcs/bot/v1/contactCapabilities?userContact=%2B919574158474&botName=rml_jbm";
        
        const res = await axios.get(url, {
            headers: { "Authorization": `Bearer ${RML_TOKEN.replace("Bearer ", "")}` }
        });

        console.log("✅ Read Access Works! Status:", res.status);
    } catch (err) {
        console.error("❌ Read Access Failed:", err.response?.status, err.response?.data);
    }
}

testReadAccess();