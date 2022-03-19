import React, {useCallback, useState, useEffect} from 'react'
import axios from 'axios'

const Employee = () => {

    const [employees, setEmployees] = useState([])
    const [name,setName] = useState('')
    const [position,setPosition] = useState('')
    const [salary,setSalary] = useState(0)

    const fetchData = useCallback(()=>{
        axios({
            method:'GET',
            url: 'http://localhost:5000/api/employee/all'
        }).then((res) => {
            setEmployees(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    const resetForm = () =>{
        setName('')
        setPosition('')
        setSalary(0)
    }

    const deleteEmp = (id)=>{
        axios({
            method:'DELETE',
            url:`http://localhost:5000/api/employee/${id}`
        }).then((res) =>{
            console.log(res.data)
            fetchData()
        }).catch((err) =>{
            console.log(err)
        })
    }

    const onSubmitForm = (e) =>{
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/employee/',
            data:{
                name:name,
                position:position,
                salary:salary
            }
        }).then((res) =>{
            console.log(res.data)
            resetForm()
            fetchData()
        }).catch((err)=>{
            console.log(err)
        })
    }

    console.log(employees)

    console.log(name,position,salary)
    return(
        <div>
            <form onSubmit={(e) => onSubmitForm(e)}>
                <label>Name</label>
                <input type ="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Position</label>
                <input type ="text" value={position} onChange={(e) => setPosition(e.target.value)}/>
                <label>Name</label>
                <input type ="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                <input type="submit" value="Add Employee" />
            </form>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
                {employees && employees.map((employee,key) =>(
                    <tr key={key}>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.salary}</td>
                    <td><input type="button" value = "Delete" onClick={()=>deleteEmp(employee._id)}/></td>
                </tr>
                ))}
            </table>
        </div>
    )
}

export default Employee 