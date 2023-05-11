import React from 'react';
import { SelectStyled, SubmitBtn } from './Elements';
import { MultiSelect, Option } from '../Common/MultiSelect';
import { useThemeContext } from '../../providers/ThemeContext';
import { usePost } from '../../utils/use-request';
import { Department, User } from '../../models';

const EditUserForm = ({ user, departments }: EditUserFormProps) => {
	const [isDark] = useThemeContext();
	const [{ loading }, send] = usePost();

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const formElms = (e.target as HTMLFormElement).elements;
		
		const nInscription = formElms.namedItem("nInscription") as HTMLInputElement;
		const selectedDeps = formElms.namedItem("departments") as HTMLInputElement;
		const role = formElms.namedItem("role") as HTMLInputElement;

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

type EditUserFormProps = {
	user: User,
	departments: Array<Department>
}


export default EditUserForm;
