import React from 'react';
import { Link } from 'react-router-dom';
import CoursesModal from '../Admin/CoursesModal';
import { CoursesList } from './Elements';
import { getUserInfo } from '../../utils/authenticator';


const Courses = React.memo(({ dark, loading, departmentName, courses, hasDepartment }: CoursesProps) => {
	const { role } = getUserInfo();

	return (
		<CoursesList dark={dark}>
			<h4>{hasDepartment && (departmentName || '...')}</h4>
			{hasDepartment && (
				<ul>
					{loading || !courses ? (
						'Loading ...'
					) : (
						<>
							{courses.map(course => (
								<li key={course.id}>
									<Link to={`/${course.departmentId}/${course.id}`}>{course.name}</Link>
								</li>
							))}

							{role === 'teacher' && (
								<CoursesModal
									render={setIsOpen => (
										<li>
											<button type="button" onClick={() => setIsOpen(true)}>
												Create Course
											</button>
										</li>
									)}
								/>
							)}
						</>
					)}
				</ul>
			)}
		</CoursesList>
	);
});

type CoursesProps = {
	dark: boolean,
	loading: boolean,
	departmentName: string,
	courses: Array<{
		id: number,
		name: string,
		departmentId: number,
	}>,
	hasDepartment: boolean,
};

export default Courses;
