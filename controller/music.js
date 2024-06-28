import { getmusics, getmusic, addmusic, deletemusic, updatemusic } from "../models/database.js";



export default {
    getallsongs: async (req,res) => {
        res.send(await getmusics())
    },
    getsong: async (req,res) => {
        res.send(await getmusic(req.params.id))
    },
    addsong: async (req,res) => {
        const {title,duration,song_path,image,user_id} = req.body;
        const { user} = req.query
        res.send(await addmusic(title,duration,song_path,image,user))
    },
    deletesong: async (req,res) => { 
        res.send(await deletemusic(req.params.id))
    },
    updatesong: async (req,res) => {
        let { title,duration,song_path,image} = req.body;

        try {
            const [user] = await getmusic(+req.params.id);
    
            title = title ? title : user.title;
            duration = duration ? duration : user.duration;
            song_path = song_path ? song_path : user.song_path;
            image = image ? image : user.image;
    
            await updateTask(task_name, d_o_s, d_o_c,+req.params.id);
            await updatemusic(title,duration,song_path,image,+req.params.id);
    
            res.send(await getmuiscs());
        } catch (error) {
            res.status(500).send("Error updating song");
        }
    }
}
