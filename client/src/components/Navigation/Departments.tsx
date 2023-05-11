import React from 'react';
import { Link } from 'react-router-dom';
import DepartmentsModal from '../Admin/DepartmentsModal';
import { DepartmentsList, Separator, Tooltip } from './Elements';
import { getUserInfo } from '../../utils/authenticator';
import logo from '../../assets/images/logo.png';

const Departments = React.memo(({ loading, departments }: DepartmentsProps) => {
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
							<Department key={dep.id} department={dep} />
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

const Department = ({ department }: DepartmentProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<li>
			<Link to={`/${department.id}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				{department.abbr}
			</Link>
			{isOpen && <Tooltip>{department.name}</Tooltip>}
		</li>
	);
};

type DepartmentsProps = {
	loading: boolean,
	departments: Array<{
		id: number,
		name: string,
		abbr: string,
	}>
};

type DepartmentProps = {
	department: {
		id: number,
		name: string,
		abbr: string,
	},
};



export default Departments;
