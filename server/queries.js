const Pool = require('pg').Pool;
const credentials = require('../constants/queriesConstant.js');

const pool = new Pool({
    user: credentials.pgUser,
    host: 'localhost',
    database: 'TryApp',
    password: credentials.pgPassword,
    port: 5432
});

const getAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM skills');
        return result.rows
    } catch (err) {
        return {
            status: 500,
            message: err.message
        };
    }
};

const getOne = async (skillId) => {
    try {
        const result = await pool.query('SELECT * FROM skills WHERE id = $1;', [skillId])
        return result.rows
    } catch (err) {
        return {
            status: 500,
            message: err.message
        };
    }
};

const addSkill = async (skillName, maxSkillLevel) => {
    try {
        await pool.query('INSERT INTO public.skills(max_skill_level, skill_name) VALUES ($2, $1);', [skillName, maxSkillLevel]);
        return {
            status: 201,
            message: "Added successfully!"
        };
    } catch (err) {
        return {
            status: 500,
            message: err.message
        };
    };
};

const updateSkill = async (skillId, skillDetails) => {
    try {
        let skillName = skillDetails.skillName;
        let maxSkillLevel = skillDetails.maxSkillLevel;
        let checkIfExistingById = await pool.query('SELECT COUNT(*) FROM public.skills WHERE id = $1;', [skillId]);
        if (checkIfExistingById.rows[0].count != 0) {
            await pool.query('UPDATE public.skills SET max_skill_level = $3, skill_name = $2 WHERE id = $1;', [skillId, skillName, maxSkillLevel]);
            return {
                status: 204,
                message: "Updated successfully!"
            };
        } else {
            return {
                status: 204,
                message: "Record does not exist!"
            };
        }
    } catch (err) {
        return {
            status: 500,
            message: err.message
        };
    }
};

const deleteSkill = async (skillId) => {
    try {
        await pool.query('DELETE FROM public.skills WHERE id = $1;', [skillId]);
        return {
            status: 200,
            message: "Deleted successfully!"
        };
    } catch (err) {
        return {
            status: 500,
            message: err.message
        };
    };
};

module.exports = {
    getAll,
    getOne,
    addSkill,
    deleteSkill,
    updateSkill
}