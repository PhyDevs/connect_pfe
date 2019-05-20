import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { CoursesList } from './Elements';

const Courses = React.memo(({ dark, loading, departmentName, courses, hasDepartment }) => (
	<CoursesList dark={dark}>
		<h4>{hasDepartment && (departmentName || '...')}</h4>
		{hasDepartment && (
			<ul>
				{loading || !courses
					? 'Loading ...'
					: courses.map(course => (
							<li key={course.id}>
								<Link to={`/${course.departmentId}/${course.id}`}># {course.name}</Link>
							</li>
					  ))}
			</ul>
		)}
	</CoursesList>
));

Courses.propTypes = {
	dark: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	departmentName: PropTypes.string,
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			departmentId: PropTypes.number,
		})
	),
	hasDepartment: PropTypes.bool,
};

Courses.defaultProps = {
	loading: true,
	departmentName: null,
	courses: null,
	hasDepartment: false,
};

export default Courses;
