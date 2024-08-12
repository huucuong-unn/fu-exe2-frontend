import {useState, useEffect} from 'react';
const testAPI = require('../../API/TestAPI');



function Home() {
    const [testData, setTestData] = useState();

    useEffect(() => {
        const getTestAPI = async () => {
            const data = await testAPI.testAPI();
            console.log(data);
            setTestData(data);
            console.log(testData)

        };
        getTestAPI();
    }, [testData]);

    return (
        <div>
            <h2>Following</h2>
            <div>{testData ? <h2>{testData}</h2> : <p>Loading...</p>}</div>
        </div>
    );
}

export default Home;
