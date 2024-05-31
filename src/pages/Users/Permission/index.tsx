import { PageBreadcrumb } from '@/components'
import {  Card } from 'react-bootstrap'

import { Table } from 'react-bootstrap'

import { useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

interface TableRecord {
	id: number
	name: string
	phoneNo: string
	dob: string
	country: string
	accountNo: string
	cell: string
	activeClass?: string
}

 const states = [
	'Report view',
	'Report edit',
	'Report print'
]

const records: TableRecord[] = [
	{
		id: 1,
		name: 'Risa D. Pearson',
		phoneNo: '336-508-2157',
		dob: 'July 24, 1950',
		country: 'India',
		accountNo: 'AC336 508 2157',

		cell: 'Cell',
		activeClass: 'table-active',
	},
	{
		id: 2,
		name: 'Ann C. Thompson',
		phoneNo: '646-473-2057',
		dob: 'January 25, 1959',
		country: 'USA',
		accountNo: 'SB646 473 2057',

		cell: 'Cell',
	},
	{
		id: 3,
		name: 'Paul J. Friend',
		phoneNo: '281-308-0793',
		dob: 'September 1, 1939',
		country: 'Canada',
		accountNo: 'DL281 308 0793',

		cell: 'Cell',
	},
	{
		id: 4,
		name: 'Linda G. Smith',
		phoneNo: '606-253-1207',
		dob: 'May 3, 1962',
		country: 'Brazil',
		accountNo: 'CA269 714 6825',

		cell: 'Cell',
	},
]

const Permission = () => {

	const [multiSelections, setMultiSelections] = useState<any>([])


	const onChangeMultipleSelection = (selected: any) => {
		setMultiSelections(selected)
	}

	return (
		<>
			<PageBreadcrumb title="User Permission" subName="User" />

			<div
				className="d-flex justify-content-between"
				style={{ marginTop: '10px' }}>
				<div className="d-flex gap-1">
					{/* <Button className="btn-outline-primary" onClick={filterToggleHandler}>
						<i className="ri-equalizer-line me-1" /> filter
					</Button> */}
					<form>
						<div className="input-group">
							
							<input
								type="search"
								className="form-control"
								placeholder="Search..."
							/>
						</div>
					</form>
				</div>
			</div>

			{/* filter  */}
			{/* <Card className={`mt-3 ${!filterToggle ? "d-none" : ""}`}>
				<Card.Header>
					<div className="grid-container">
						<Row className="grid-container">
							<Col lg={4}>
								<FormInput
									label="To Date"
									type="date"
									name="date"
									containerClass="mb-3"
									// register={register}
									key="date"
									// errors={errors}
									// control={control}
								/>
							</Col>
							<Col lg={4}>
								<FormInput
									label="From Date"
									type="date"
									name="date"
									containerClass="mb-3"
									// register={register}
									key="date"
									// errors={errors}
									// control={control}
								/>
							</Col>

							<Col lg={4}>
								<FormInput
									label="From Date"
									type="date"
									name="date"
									containerClass="mb-3"
									// register={register}
									key="date"
									// errors={errors}
									// control={control}
								/>
							</Col>
							<Col lg={6}>
							<FormInput
								name="select"
								label="Cashier"
								type="select"
								containerClass="mb-3"
								className="form-select"
								// register={register}
								key="select"
								// errors={errors}
								// control={control}
							>
								<option defaultValue="selected">1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</FormInput>
								</Col>
								<Col lg={6}>
							<FormInput
								name="select"
								label="Input Select"
								type="select"
								containerClass="mb-3"
								className="form-select"
								// register={register}
								key="select"
								// errors={errors}
								// control={control}
							>
								<option defaultValue="selected">1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</FormInput>
								</Col>
						</Row>
					</div>
				</Card.Header>
			</Card> */}
			{/* filter  */}

			{/* Data table  */}

			<Card  className='mt-3'>
				<Card.Header>
					<h4 className="header-title">Always responsive</h4>
					<p className="text-muted mb-0">
						Across every breakpoint, use&nbsp;
						<code>.table-responsive</code> for horizontally scrolling tables.
						Use&nbsp;
						<code>{`.table-responsive{-sm|-md|-lg|-xl}`}</code> as needed to
						create responsive tables up to a particular breakpoint. From that
						breakpoint and up, the table will behave normally and not scroll
						horizontally.
					</p>
				</Card.Header>
				<Card.Body>
					<Table responsive className="mb-0">
						<thead>
							<tr>
								<th scope="col">Cashier ID</th>
								<th scope="col"> Cashier Name</th>
								<th scope="col">Cashier Permission</th>
								<th scope="col">State</th>
							</tr>
						</thead>
						<tbody>
							{(records || []).slice(0, 3).map((record, idx) => {
								return (
									<tr key={idx}>
										<td>12</td>
										<td>Imalka ththmi</td>
										<td>
											<Typeahead
												id="multi"
												labelKey={'label'}
												multiple
												onChange={onChangeMultipleSelection}
												options={states}
												placeholder="Basic Example"
												selected={multiSelections}
											/>
										</td>
										<td>Online</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</>
	)
}

export default Permission
