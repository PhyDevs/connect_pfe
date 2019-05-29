import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../providers/ThemeContext';
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
		top: 14px;
		right: 8px;
		font-size: 0.8rem;
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
		background-color: #8e8e8e;
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
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.dark : colors.light)};
	border: 1px solid ${colors.main};
	border-radius: 0 0 4px 4px;
	cursor: default;
	z-index: 5;

	ul li {
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

const MultiSelect = ({ name, children, initState }) => {
	const [isDark] = useThemeContext();

	const selectConNode = React.useRef();
	const optionsConNode = React.useRef();

	const [isOpen, setopen] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState(initState);

	const handleClick = e => {
		if (!selectConNode.current.contains(e.target)) setopen(false);
		else if (optionsConNode.current && optionsConNode.current.contains(e.target)) setopen(true);
		else setopen(prevOpen => !prevOpen);
	};

	const handleChange = e => {
		const { value, checked } = e.target;
		const label = e.target.getAttribute('label');

		if (checked) {
			setSelectedOptions(prevOptions => [...prevOptions, { label, value }]);
		}
	};

	const removeOption = value => {
		setSelectedOptions(prevOptions => prevOptions.filter(option => option.value !== value));
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClick, false);
		return () => {
			document.removeEventListener('click', handleClick, false);
		};
	}, []);

	return (
		<SelectCon className={isOpen && 'focused'} ref={selectConNode}>
			<input type="hidden" name={name} value={selectedOptions.map(option => option.value)} />
			<ul>
				{selectedOptions.map(option => (
					<li key={option.value}>
						{option.label}
						<button type="button" onClick={() => removeOption(option.value)}>
							X
						</button>
					</li>
				))}
			</ul>
			<span>&#9660;</span>
			{isOpen && (
				<SelectOptionsCon ref={optionsConNode} dark={isDark}>
					<ul>
						{React.Children.map(children, child => {
							const { value } = child.props;
							if (value && !selectedOptions.some(option => option.value === value)) {
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
	initState: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		})
	),
};
MultiSelect.defaultProps = {
	initState: [],
};

const Option = ({ label, value, changed }) => {
	return (
		<li>
			<label htmlFor={value}>
				<input type="checkbox" id={value} value={value} label={label} onChange={changed} />
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
