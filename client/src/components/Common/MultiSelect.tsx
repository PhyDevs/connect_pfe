import React from 'react';
import styled from '@emotion/styled';
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

const SelectOptionsCon = styled.div<SelectOptionsConProps>`
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
type SelectOptionsConProps = {
	dark: boolean
}

const MultiSelect = ({ name, children, initState = [] }: MultiSelectProps) => {
	const [isDark] = useThemeContext();

	const selectConNode = React.useRef<HTMLDivElement>(null);
	const optionsConNode = React.useRef<HTMLDivElement>(null);

	const [isOpen, setopen] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState(initState);

	const handleClick = (e: MouseEvent) => {
		if (selectConNode.current !== null && !selectConNode.current.contains(e.target as HTMLElement))
			setopen(false);
		else if (optionsConNode.current !== null && optionsConNode.current.contains(e.target as HTMLElement))
			setopen(true);
		else
			setopen(prevOpen => !prevOpen);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const { value, checked } = e.target;
		const label = e.target.getAttribute('label');

		if (checked && label !== null) {
			setSelectedOptions(prevOptions => [...prevOptions, { label, value }]);
		}
	};

	const removeOption = (value: string) => {
		setSelectedOptions(prevOptions => prevOptions.filter(option => option.value !== value));
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClick, false);
		return () => {
			document.removeEventListener('click', handleClick, false);
		};
	}, []);

	return (
		<SelectCon className={isOpen ? 'focused' : ''} ref={selectConNode}>
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

type MultiSelectProps = {
	name: string,
	children: JSX.Element | JSX.Element[],
	initState?: Array<{
		value: string,
		label: string,
	}>
};


const Option = ({ label, value, changed }: OptionProps) => {
	return (
		<li>
			<label htmlFor={value}>
				<input type="checkbox" id={value} value={value} onChange={changed} />
				{label}
			</label>
		</li>
	);
};

type OptionProps = {
	label: string,
	value: string,
	changed: React.ChangeEventHandler<HTMLInputElement>,
};
Option.defaultProps = {
	changed: null,
};

export { MultiSelect, Option };
