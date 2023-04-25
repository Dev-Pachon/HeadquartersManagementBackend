import db from "./db-connection";
const bcrypt = require("bcrypt")

const login = (user, res)=>{

	const SQL = "SELECT * FROM `users` WHERE email = ?";
	const values =[
		user.email
	]

	db.query(SQL,values,(err, result, fields)=>{
		if (err) {
			console.error(err);
			return res.json("Error")
		}
		if (!result || result.size === 0){
			return res.json("Error")
		}

		return bcrypt.compare(user.password, result[0].password, function(err, result) {
			if (result) {
				return res.json("Success");
			}
			return res.json("Failed")
		});
	});

}

const getUser = (user, res)=>{
	const SQL = "SELECT `firstname`, `lastname`, `email` FROM `users` WHERE `firstname` LIKE ? OR `lastname` LIKE ?";
	const values =[
		user.firstname,
		user.lastname
	]
	return db.query(SQL,values,(err, result, fields)=>{
		if (err) {
			console.error(err);
			return res.json("Error").status(400);
		}
		return res.json(result);
	});
}

const addUser = (user, res)=>{
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err){
			console.error(err)
			return res.json("Error")
		}
		user.password = hash
	});

	const SQL = "INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `valid_until`) VALUES (?)";
	const values =[
		user.firstname,
		user.lastname,
		user.email,
		user.password,
		user.valid_until
	]
	db.query(SQL,values,(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const editUser = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	})
};

const deleteUser = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const getHeadquarter = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const addHeadquarter = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const editHeadquarter = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const deleteHeadquarter = ()=>{
	db.query(``,[],(err, result, fields)=>{
		if (err) {
			console.error(err);
			return false;
		}
		return result;
	});
}

const dbQueries = {
	addUser,
	addHeadquarter,
	editHeadquarter,
	deleteHeadquarter
}

module.exports = dbQueries