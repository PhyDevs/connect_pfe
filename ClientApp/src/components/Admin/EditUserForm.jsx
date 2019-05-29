import React from 'react';
import PropTypes from 'prop-types';
import { SelectStyled, SubmitBtn } from './Elements';
import { MultiSelect, Option } from '../Common/MultiSelect';
import { useThemeContext } from '../../providers/ThemeContext';
import { usePost } from '../../utils/use-request';

const EditUserForm = ({ user, departments }) => {
	const [isDark] = useThemeContext();
	const [{ loading }, send] = usePost();

	const handleSubmit = async e => {
		e.preventDefault();
		const { nInscription, departments: selectedDeps, role } = e.target.elements;
		const roleCode = role.value === 'admin' ? 2 : role.value === 'teacher' ? 1 : 0;
		const data = !selectedDeps.value ? [] : selectedDeps.value.split(',');

		await send(`users/${nInscription.value}/departments?role=${roleCode}`, data);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input type="hidden" name="nInscription" value={user.nInscription} />
			<span>{user.nInscription}</span>
			<span>{user.fullName}</span>
			<span>
				<SelectStyled name="role" defaultValue={user.role} dark={isDark}>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
					<option value="admin">Admin</option>
				</SelectStyled>
			</span>
			<span>
				<MultiSelect name="departments">
					{departments ? (
						departments.map(department => (
							<Option key={department.id} label={department.abbr} value={`${department.id}`} />
						))
					) : (
						<span />
					)}
				</MultiSelect>
			</span>
			<span>
				<SubmitBtn type="submit" value="edit" loading={loading} />
			</span>
		</form>
	);
};

EditUserForm.propTypes = {
	user: PropTypes.shape({
		nInscription: PropTypes.number,
		fullName: PropTypes.string,
		role: PropTypes.string,
	}).isRequired,

	departments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			abbr: PropTypes.string,
		})
	),
};

EditUserForm.defaultProps = {
	departments: null,
};

export default EditUserForm;
