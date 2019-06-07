import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import DepartmentsModal from '../Admin/DepartmentsModal';
import { DepartmentsList, Separator, Tooltip } from './Elements';
import { getUserInfo } from '../../utils/authenticator';
import logo from '../../images/logo.png';

const Departments = React.memo(({ loading, departments }) => {
	const { role } = getUserInfo();

	return (
		<DepartmentsList>
			<ul>
				<li>
					<Link to="/" className="logo">
						<img src={logo} alt="connect logo" />
					</Link>
				</li>
				<Separator />
				{loading || !departments ? (
					'Loading'
				) : (
					<>
						{departments.map(dep => (
							<Department key={dep.id} dep={dep} />
						))}
						{role === 'admin' && (
							<>
								<Separator />
								<DepartmentsModal
									render={setIsOpen => (
										<li>
											<button type="button" onClick={() => setIsOpen(true)}>
												+
											</button>
										</li>
									)}
								/>
							</>
						)}
					</>
				)}
			</ul>
		</DepartmentsList>
	);
});

const Department = ({ dep }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<li>
			<Link to={`/${dep.id}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				{dep.abbr}
			</Link>
			{isOpen && <Tooltip>{dep.name}</Tooltip>}
		</li>
	);
};

Departments.propTypes = {
	loading: PropTypes.bool,
	departments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			abbr: PropTypes.string,
		})
	),
};

Department.propTypes = {
	dep: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		abbr: PropTypes.string,
	}).isRequired,
};

Departments.defaultProps = {
	loading: true,
	departments: null,
};

export default Departments;
