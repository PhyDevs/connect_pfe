import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { CoursesList } from './Elements';

const Courses = ({ dark, loading, departmentName, courses }) => (
	<CoursesList dark={dark}>
		<h4>{departmentName || '...'}</h4>
		<ul>
			{loading || !courses
				? 'Loading ...'
				: courses.map(course => (
						<li key={course.id}>
							<Link to={`/${course.departmentId}/${course.id}`}># {course.name}</Link>
						</li>
				  ))}
		</ul>
	</CoursesList>
);

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
};

Courses.defaultProps = {
	loading: true,
	departmentName: null,
	courses: null,
};

export default Courses;
