import { pool } from "../config/config.js";
// import user from "../controller/user.js";

const getusers = async() => {
    const [users] = await pool.query("SELECT * FROM users");
    return users  
}
const addusers = async(username,email,password) => {
    const [result] = await pool.query(`
    insert into users (username,email,password) values (?,?,?,?);
    `,[username,email,password] 
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

    const loggeduser =  async(email)=> {
        const [[user]]= await pool.query(`
        SELECT * From users WHERE email = ?`,[email])
        console.log(user);
            return user
        }
// Music

const getmusics = async() => {
    const [music] = await pool.query("SELECT * FROM music");
    return music
}

const getmusic = async(id) => {
    const [music] = await pool.query("SELECT * FROM music WHERE id = ?", [id]);
    return music
}

const addmusic = async(title,duration,song_path,image,user_id)=>{
    const [result] = await pool.query(`
    insert into music (title,duration,song_path,image,user_id) values (?,?,?,?,?)
    `,[title,duration,song_path,image,user_id] 
    ) 
    return result
}

const updatemusic = async(title,duration,song_path,image,id) => {
    const [music]  = await pool.query(`
        UPDATE music SET title =?, duration =?, song_path =?, image =? WHERE id =?
    `, [title,duration,song_path,image,id])
    return music
}

const deletemusic = async(id)=> {
    const [music]  = await pool.query(`
        DELETE FROM music WHERE  id=?
    `, [id])
    return music
}




export  {
    checkuser,
    deleteuser,
    updateuser,
    addusers,
    getuser,
    getusers,
    getmusics, // Fixed typo here
    getmusic,
    addmusic, // Fixed export name here
    deletemusic,
    updatemusic,
    loggeduser
};