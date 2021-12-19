const UserDB=require("../models").Users;
const sequelize=require("../models/index").sequelize;
const controller={
    addUser: async (req, res) => {
        const user = {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            email: req.body.email
        }
    
        let errors = {};
    
        if (!user.name) {
            errors.name = "Empty name";
        }
        if (!user.surname) {
            errors.surname = "Empty surname";
        }
        if (!user.age) {
            errors.age = "Empty age";
        } else if (isNaN(user.age)) {
            errors.invalidAge = "Invalid age format should be number only";
        }

        console.log("merge");
        console.log(user);

        if (Object.keys(errors).length === 0) {
            try{
                await UserDB.create(user);
                return res.status(200).send({message:"Created"});
            }
            catch(error){
                console.log(error);
            }
        } else {
            return res.status(400).send(errors);
        }

    },

    updateInfo:async (req, res) => {
        const user = await UserDB.findByPk(req.params.userId);
        if (user) {
            user.update({
                name: req.body.name,
                surname: req.body.surname,
                age: req.body.age,
                email: req.body.email
            }).then(() => res.status(200).send({ message: "User updated" }))
                .catch(() => res.status(500).send({ message: "Some server error occured" }))
        } else {
            return res.status(400).send({ message: "There is not any user with this id." })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await UserDB.findByPk(req.params.customId);
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }

    },

    reset: async (req, res) => {
        try {
            await sequelize.sync({ force: true })
            return res.status(200).send({ message: "Reset db successfully" })
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports=controller;