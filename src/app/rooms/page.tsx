"use client";
export const metadata = {
    title: 'Rooms'
};

const regex2 = "(|^)\\d{${6}"

const API_ENDPOINT = "http://localhost:8000/api/hello"

export default function RoomsPage(props) {
    return <>
        <h1>Rooms</h1>
        <button onClick={async () => {
            const regex = '\\b\\d{6}\\b'
            const payload = {
                "action": "OTP_REQUEST",
                "payload": {
                    "regex": "\\b\\d{6}\\b"
                }
            }
            console.log(`regex: ${JSON.stringify(payload)}`);
            
            // const res = await fetch(API_ENDPOINT)
            // const body = await res.json();
            // console.log(body);
        }} style={{background: 'red'}}>Get room</button>
    </>
}