import { pool } from "../config/config.js";

const getusers = async() => {
    const [users] = await pool.query("SELECT * FROM users");
    return users  
}
const addusers = async(username,email,password) => {
    const [result] = await pool.query(`
    insert into users (username,email,password) values (?,?,?,?);
    `,[username,email,password,role] 
    ) 
    return result 
}

const getuser = async(id) => {
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
    return user
}

const updateuser = async(username,email,password,user_id) => {
    const [user]  = await pool.query(`
        UPDATE users SET username =?, email =?, password =? WHERE user_id =?
    `, [username,email,password,user_id])
    return user 
}

const deleteuser = async(id)=> {
    const [user]  = await pool.query(`
        DELETE FROM users WHERE  user_id=?
    `, [id])
    return user
}

const checkuser = async(email)=> {
    const [[{password}]]= await pool.query(`
    SELECT password From users WHERE email = ?`,[email])
    console.log(password);
        return password
    }


    export default {checkuser, deleteuser,updateuser, addusers,getuser,getusers}