import React from 'react';
import './styles.css'
import { Select, Space } from 'antd';

const onFinish = (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	const values = Object.fromEntries(formData.entries());
	console.log('Received values of form: ', values);
};

const options = [
	{
		label: 'Ho Chi Minh',
		value: 'ho-chi-minh',
	},
	{
		label: 'Da Nang',
		value: 'da-nang',
	},
];

const FilterTool = () => (
	<div>
		<form name="filter" onSubmit={onFinish} className="flex flex-col gap-8">
			<div className="flex flex-row justify-between gap-10">
				<div className="flex flex-col grow">
					<label className="location-title">Class location</label>
					<div className="multi-select">
						<Select
							mode="multiple"
							size="middle"
							placeholder="Please select"
							style={{ width: '100%' }}
							options={options}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<p className="location-title">Class time frame</p>
					<div className="flex flex-row gap-2">
						<div className="flex flex-row gap-2 items-center">
							<label className="from-time">from</label>
							<input type="date" name="date-from" required />
						</div>
						<div className="flex flex-row gap-2 items-center">
							<label className="to-time">to</label>
							<input type="date" name="date-to" required />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-3">
					<p className="font-bold">Class time</p>
					<div className="flex flex-col gap-2">
						<label>
							<input type="checkbox" name="classTime" value="morning" /> Morning
						</label>
						<label>
							<input type="checkbox" name="classTime" value="noon" /> Noon
						</label>
						<label>
							<input type="checkbox" name="classTime" value="night" /> Night
						</label>
						<label>
							<input type="checkbox" name="classTime" value="online" /> Online
						</label>
					</div>
				</div>
				<div className="flex flex-row gap-3">
					<p className="font-bold">Status</p>
					<div className="flex flex-col gap-2">
						<label>
							<input type="checkbox" name="status" value="planning" /> Planning
						</label>
						<label>
							<input type="checkbox" name="status" value="opening" /> Opening
						</label>
						<label>
							<input type="checkbox" name="status" value="closed" /> Closed
						</label>
					</div>
				</div>
				<div className="flex flex-row gap-3">
					<p className="font-bold">Attendee</p>
					<div className="flex flex-col gap-2">
						<label>
							<input type="checkbox" name="attendee" value="intern" /> Intern
						</label>
						<label>
							<input type="checkbox" name="attendee" value="fresher" /> Fresher
						</label>
						<label>
							<input type="checkbox" name="attendee" value="online-fee-fresher" /> Online fee-fresher
						</label>
						<label>
							<input type="checkbox" name="attendee" value="offline-fee-fresher" /> Offline fee-fresher
						</label>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-12">
				<div className="flex flex-row items-center gap-3">
					<label className="location-title">FSU</label>
					<select name="fsu" className='shadow-xl elevation2 rounded-md h-8' required>
						<option value="">Select</option>
						<option value="FSOFTHoChiMinh">FSOFT Ho Chi Minh</option>
						<option value="FSOFTDaNang">FSOFT Da Nang</option>
						<option value="FSOFTHaNoi">FSOFT Ha Noi</option>
					</select>
				</div>
				<div className="flex flex-row items-center gap-3">
					<label className="location-title">Trainer</label>
					<select name="fsu" className='shadow-xl elevation2 rounded-md h-8' required>
						<option value="">Select</option>
						<option value="FSOFTHoChiMinh">Dr.Vinh Vui Ve </option>
						<option value="FSOFTDaNang">Dr.Ngo Huy</option>
						<option value="FSOFTHaNoi">Dr.The Thanh</option>
					</select>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<div className="flex flex-row gap-2">
					<button type="reset" className="clear-btn">Clear</button>
					<button type="submit" className="search-btn">Search</button>
				</div>
			</div>
		</form>
	</div>
);

export default FilterTool;
