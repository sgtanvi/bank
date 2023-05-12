import axios from "axios";
import FormInput from "./FormInput";
import "./Registration.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
    // to reach the values object inside register boxes cuz its object ({})
    const [values, setValues] = useState({
        username: "",
        password: "",
        pin: "",
    })

    const navigate = useNavigate()

    //inputs array for username, password, pin
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username should be 3-16 characters and shouldn't include any numbers or special character!",
            label: "Username",
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "text",
            placeholder: "Password",
            errorMessage: "Password should be 8-20 characters and must include 1 letter 1 number and 1 special character!",
            label: "Password",
            pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*;])[A-Za-z0-9!@#$%^&*;]{8,20}$",
            required: true,
        },
        {
            id: 3,
            name: "pin",
            type: "password",
            placeholder: "Pin",
            errorMessage: "Pin must be 4 digits",
            label: "Pin",
            pattern: "^[0-9]{4}$",
            required: true,
        }
    ]
    // Saving as FormData in congole log when submit 
    const handleSubmit = (e) => {
        e.preventDefault();

          const data = new FormData(e.target)
          console.log(Object.fromEntries(data.entries()))
        //   navigate("/")

    };
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

//////////////////////********** TANVI***********////////////////////////////////////////

const handleClick = async e => {
    e.preventDefault();

    if (!values.username) {
        toast.error("Please enter a username...");
    }
    else if (!values.password) {
        toast.error("Please enter a password...");
    }
    else if (!values.pin) {
        toast.error("Please enter a PIN...");
    }
    else {

        if (values.username.length < 3 || values.username.length > 16
            || /\d/.test(values.username) || /[!@#$%^&*;]/.test(values.username)) {
            toast.error("Invalid Username")
        }
        else if (values.password.length < 8 || values.password.length > 20
            || !/[A-Z]/.test(values.password) || !/\d/.test(values.password) || !/[!@#$%^&*;]/.test(values.password)) {
            toast.error("Invalid password")
        }
        else if (values.pin.length !== 4
            || isNaN(values.pin[0]) || isNaN(values.pin[1]) || isNaN(values.pin[2]) || isNaN(values.pin[3])) {
            toast.error("Invalid PIN")
        }
        else {
            var valid = 1;

            const requests = [
                axios.post("http://localhost:5000/regusercheck", {
                    Username: values.username,
                }),
                axios.post("http://localhost:5000/regpasscheck", {
                    Password: values.password,
                }),
                axios.post("http://localhost:5000/regpincheck", {
                    PIN: values.pin,
                })
            ];

            /*  navigate("/") */

            /* const responses = await Promise.all(requests); */

           /*  responses.forEach((response) => {
                if (response.data.message) {
                    valid = 0;
                    toast.error(response.data.message);
                }
            }); */

            // navigate("/")
            console.log(valid);
            if (valid === 1) {
                try {
                    //what if our end point change
                    await axios.post("http://localhost:5000/api/users", values)
                    navigate("/login")
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}


//////insertjaimecodehere - tanvi


console.log(values);

return (
    <div className="register">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input) => (
                <FormInput className = "form" key={input.id} {...input} value={values.name} onChange={onChange} />
            ))}
             <br></br>
            <button className="registration-button" onClick={handleClick}>Submit</button>
        </form>
        <br></br>
        <Link to={"/login"}><button className="registration-button">Exit</button></Link>

    </div>

)
};
export default Registration

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////JAIME

/*
    const handleClick = async e => {
        e.preventDefault();

        if (!values.username) {
            toast.error("Please enter a username...");
        }
        else if (!values.password) {
            toast.error("Please enter a password...");
        }
        else if (!values.pin) {
            toast.error("Please enter a PIN...");
        }
        else {

            if (values.username.length < 3 || values.username.length > 16
                || /\d/.test(values.username) || /[!@#$%^&*;]/.test(values.username)) {
                toast.error("Invalid Username")
            }
            else if (values.password.length < 8 || values.password.length > 20
                || !/[A-Z]/.test(values.password) || !/\d/.test(values.password) || !/[!@#$%^&*;]/.test(values.password)) {
                toast.error("Invalid password")
            }
            else if (values.pin.length !== 4
                || isNaN(values.pin[0]) || isNaN(values.pin[1]) || isNaN(values.pin[2]) || isNaN(values.pin[3])) {
                toast.error("Invalid PIN")
            }
            else {
                var valid = 1;

                axios.post("http://localhost:5000/regusercheck", {
                    Username: values.username,
                }).then((response) => {
                    if (response.data.message) {
                        valid = 0;
                        toast.error(response.data.message);
                    }
                });

                axios.post("http://localhost:5000/regpasscheck", {
                    Password: values.password,
                }).then((response) => {
                    if (response.data.message) {
                        valid = 0;
                        toast.error(response.data.message);
                    }
                });

                axios.post("http://localhost:5000/regpincheck", {
                    PIN: values.pin,
                }).then((response) => {
                    if (response.data.message) {
                        valid = 0;
                        toast.error(response.data.message);
                    }
                });

                if (valid === 1) {
                    try {
                        //what if our end point change
                        await axios.post("http://localhost:5000/api/users", values)
                        navigate("/")
                    } catch (err) {
                        console.log(err)
                    }
                }

            }

        }
    }
*/

///////////////////////////////////////////////////////////////////////////////////

