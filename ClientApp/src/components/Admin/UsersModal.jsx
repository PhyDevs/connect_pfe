import React from 'react';
import PropTypes from 'prop-types';
import asAdminOnly from '../HOCs/asAdminOnly';
import { ClosBtn, TableStyled } from './Elements';
import EditUserForm from './EditUserForm';
import { Modal, Dialog } from '../Common/Modal';
import { useThemeContext } from '../../providers/ThemeContext';
import { useFetch } from '../../utils/use-request';

const UsersModal = ({ render }) => {
	const [isDark] = useThemeContext();
	const [{ loading, data }, getUsers] = useFetch();
	const [{ loading: depsLoading, data: departments }, getDepartments] = useFetch();

	const fetchData = React.useCallback(async () => {
		await getUsers('users');
		await getDepartments('departments');
	}, [getDepartments, getUsers]);

	return (
		<Modal>
			{({ isOpen, setIsOpen }) => (
				<>
					{isOpen && (
						<Dialog dismiss={() => setIsOpen(false)} mount={fetchData} isDark={isDark}>
							<ClosBtn type="button" onClick={() => setIsOpen(false)}>
								X
							</ClosBtn>
							<div style={{ minHeight: '300px', minWidth: '680px' }}>
								{loading || depsLoading ? (
									<div className="loading-con" />
								) : (
									data && (
										<TableStyled>
											<div className="head">
												<span>Number</span>
												<span>Full Name</span>
												<span>Role</span>
												<span>Departments</span>
												<span>Action</span>
											</div>
											{data.map(user => (
												<EditUserForm key={user.id} user={user} departments={departments} />
											))}
										</TableStyled>
									)
								)}
							</div>
						</Dialog>
					)}
					{render(setIsOpen)}
				</>
			)}
		</Modal>
	);
};

UsersModal.propTypes = {
	render: PropTypes.func.isRequired,
};

export default asAdminOnly(UsersModal);
