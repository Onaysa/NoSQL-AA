const router = require('express').Router();
const {
getAllUser,
getUserById,
createUser,
updateUser,
deleteUser,
addFriend,
removeFriend,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getAll).post(createSt);

// /api/students/:studentId
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;