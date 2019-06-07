import React from 'react';
import PropTypes from 'prop-types';
import asAdminOnly from '../HOCs/asAdminOnly';
import { ClosBtn } from './Elements';
import { Modal, Dialog } from '../Common/Modal';
import InputField from '../Form/InputField';
import { FormError } from '../Form/Elements';
import Button from '../Common/Button';
import { useThemeContext } from '../../providers/ThemeContext';
import { ValidationProvider } from '../../providers/ValidationContext';
import { usePost } from '../../utils/use-request';

const DepartmentsModal = ({ render }) => {
	const [isDark] = useThemeContext();
	const [{ loading, errors }, send] = usePost();
	const [success, setSuccess] = React.useState(null);

	const HandelSubmit = async e => {
		e.preventDefault();
		const formRef = e.target;
		const [departmentName, departmentAbbr] = formRef.elements;

		setSuccess(null);
		const { data } = await send('departments', {
			Name: departmentName.value,
			Abbr: departmentAbbr.value,
		});

		if (data) {
			setSuccess('The department added sucessfully');
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
								<div style={{ minHeight: '300px', minWidth: '420px' }}>
									<h1 className="modal-title">Add Department</h1>
									<form method="post" style={{ padding: '20px 0 0' }} onSubmit={HandelSubmit}>
										<InputField
											label="Name"
											name="departmentName"
											pattern="^.{4,}$"
											errorMsg="Use 4 characters or more"
											parentForm="addDepartment"
										/>
										<InputField
											label="Abbreviation"
											name="departmentAbbr"
											pattern="^.{2,5}$"
											errorMsg="Use more than 2 and less than 6 characters"
											parentForm="addDepartment"
										/>

										<Button type="submit" value="Add" loading={loading} />
									</form>
									{!!success && (
										<FormError success>
											<span>{success}</span>
										</FormError>
									)}
									{!!errors && (
										<FormError>
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

DepartmentsModal.propTypes = {
	render: PropTypes.func.isRequired,
};

export default asAdminOnly(DepartmentsModal);
