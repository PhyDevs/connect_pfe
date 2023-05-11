import React from 'react';
import { ClosBtn } from './Elements';
import { Modal, Dialog } from '../Common/Modal';
import InputField from '../Form/InputField';
import { FormError } from '../Form/Elements';
import Button from '../Common/Button';
import { useThemeContext } from '../../providers/ThemeContext';
import { useDataContext } from '../../providers/DataContext';
import { ValidationProvider } from '../../providers/ValidationContext';
import { getUserInfo } from '../../utils/authenticator';
import { usePost } from '../../utils/use-request';

const CoursesModal = ({ render }: CoursesModalProps) => {
	const [isDark] = useThemeContext();
	const {
		state: { currentDepartment },
	} = useDataContext();
	const [{ loading, errors }, send] = usePost();
	const { id } = getUserInfo();
	const [success, setSuccess] = React.useState<string | null>(null);

	const HandelSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const formRef = e.target as HTMLFormElement;
		const [courseName] = formRef.elements;

		setSuccess(null);
		const { data } = await send('courses', {
			Name: (courseName as HTMLInputElement).value,
			TeacherId: id,
			DepartmentId: currentDepartment,
		});

		if (data) {
			setSuccess('The course added sucessfully');
			formRef.reset();
		}
	};

	return (
		<ValidationProvider>
			<Modal>
				{({ isOpen, setIsOpen }) => (
					<>
						{isOpen && (
							<Dialog dismiss={() => setIsOpen(false)} isDark={isDark}>
								<ClosBtn type="button" onClick={() => setIsOpen(false)}>
									X
								</ClosBtn>
								<div style={{ minHeight: '240px', minWidth: '350px', padding: '0 20px 15px' }}>
									<h1 className="modal-title">Add Course</h1>
									<form method="post" style={{ padding: '20px 0 0' }} onSubmit={HandelSubmit}>
										<InputField
											label="Name"
											name="courseName"
											pattern="^.{4,}$"
											errorMsg="Use 4 characters or more"
											parentForm="addDepartment"
										/>

										<Button type="submit" value="Create" loading={loading} />
									</form>
									{!!success && (
										<FormError success>
											<span>{success}</span>
										</FormError>
									)}
									{!!errors && (
										<FormError success={false}>
											<span>
												{errors.error ||
													(!!errors[Object.keys(errors)[0]] && errors[Object.keys(errors)[0]][0]) ||
													'Error on submiting'}
											</span>
										</FormError>
									)}
								</div>
							</Dialog>
						)}
						{render(setIsOpen)}
					</>
				)}
			</Modal>
		</ValidationProvider>
	);
};

type CoursesModalProps = {
	render: (arg: Function) => JSX.Element,
};


export default CoursesModal;
