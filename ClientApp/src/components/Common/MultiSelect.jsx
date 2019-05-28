import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';

const SelectCon = styled.div`
	position: relative;
	min-height: 42px;
	padding: 5px 22px 5px 10px;
	font-size: 1.12rem;
	border: 1px solid #cbcbcb;
	border-radius: 4px;
	cursor: pointer;

	&.focused {
		border-color: ${colors.main};
		border-radius: 4px 4px 0 0;
	}

	span {
		position: absolute;
		top: 12px;
		right: 8px;
		font-size: 1rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	& > ul li {
		display: inline-block;
		margin: 3px;
		padding: 2px 6px;
		background-color: #c7c7c7;
		border-radius: 4px;
		cursor: default;

		button {
			position: relative;
			margin-left: 4px;
			padding: 0;
			font-weight: 700;
			font-size: 0.8rem;
			top: -0.1rem;
			background-color: transparent;
			cursor: pointer;
			border: none;
			outline: none;
		}
	}
`;

const SelectOptionsCon = styled.div`
	position: absolute;
	width: calc(100% + 2px);
	top: 100%;
	left: -1px;
	padding: 6px 10px;
	background-color: #ffffff;
	border: 1px solid ${colors.main};
	border-radius: 0 0 4px 4px;
	cursor: default;

	li {
		display: block;

		label {
			display: block;
			margin: 2px 0;
			padding: 2px 6px;
			cursor: pointer;
			input {
				display: none;
			}
		}
	}
`;

const MultiSelect = ({ name, children }) => {
	const selectConNode = React.useRef();
	const optionsConNode = React.useRef();

	const [isOpen, setopen] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState([]);

	const handleClick = e => {
		if (!selectConNode.current.contains(e.target)) setopen(false);
		else if (optionsConNode.current && optionsConNode.current.contains(e.target)) setopen(true);
		else setopen(prevOpen => !prevOpen);
	};

	const handleChange = e => {
		const { value, checked } = e.target;
		if (checked) {
			setSelectedOptions(prevArr => [...prevArr, value]);
		}
	};

	const removeOption = value => {
		setSelectedOptions(prevArr => prevArr.filter(e => e !== value));
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClick, false);
		return () => {
			document.removeEventListener('click', handleClick, false);
		};
	}, []);

	return (
		<SelectCon className={isOpen && 'focused'} ref={selectConNode}>
			<input type="hidden" name={name} value={selectedOptions} />
			<ul>
				{selectedOptions.map(option => (
					<li key={option}>
						{option}
						<button type="button" onClick={() => removeOption(option)}>
							X
						</button>
					</li>
				))}
			</ul>
			<span>&#9660;</span>
			{isOpen && (
				<SelectOptionsCon ref={optionsConNode}>
					<ul>
						{React.Children.map(children, child => {
							const { value } = child.props;
							if (value && selectedOptions.indexOf(value) < 0) {
								return React.cloneElement(child, { changed: handleChange });
							}
							return null;
						})}
					</ul>
				</SelectOptionsCon>
			)}
		</SelectCon>
	);
};

MultiSelect.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const Option = ({ label, value, changed }) => {
	return (
		<li>
			<label htmlFor={value}>
				<input type="checkbox" id={value} value={value} onChange={changed} />
				{label}
			</label>
		</li>
	);
};

Option.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	changed: PropTypes.func,
};
Option.defaultProps = {
	changed: null,
};

export { MultiSelect, Option };
