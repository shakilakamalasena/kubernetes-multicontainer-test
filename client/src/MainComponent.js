import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./MainComponent.css";

const MainComponent = () => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState("");

    const getAllNumbers = useCallback(async () => {
        // Use nginx to redirect it to the proper URL
        const data = await axios.get("/api/values/all");
        setValues(data.data.rows.map((row) => row.number));
    }, []);

    const saveNumber = useCallback(
        async (event) => {
            event.preventDefault();

            await axios.post("/api/values", {
                value,
            });

            setValue("");
            getAllNumbers();
        },
        [value, getAllNumbers]
    );

    useEffect(() => {
        getAllNumbers();
    }, [getAllNumbers]);

    return (
        <div>
            <button onClick={getAllNumbers}>Get all numbers</button>
            <br />
            <span className="title">Values</span>
            <div className="values">
                {values.map((value) => (
                    <div className="value">{value}</div>
                ))}
            </div>
            <form onSubmit={saveNumber} className="form">
                <label>Enter your value: </label>
                <input
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default MainComponent;
