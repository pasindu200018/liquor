import { FormInput, PageBreadcrumb } from '@/components'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { employeeRecords } from './data'
import { Column } from 'react-table'
import { PageSize, Table } from '@/components'
import { useState } from 'react'

type Employee = {
	id: number
	age: number
	name: string
	company: string
	phone: string
	subRows?: Employee[]
}

const columns: ReadonlyArray<Column> = [
	{
		Header: 'ID',
		accessor: 'id',
		defaultCanSort: true,
	},
	{
		Header: 'Name',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Phone Number',
		accessor: 'phone',
		defaultCanSort: false,
	},
	{
		Header: 'Age',
		accessor: 'age',
		defaultCanSort: true,
	},
	{
		Header: 'Company',
		accessor: 'company',
		defaultCanSort: false,
	},
]
const sizePerPageList: PageSize[] = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
	{
		text: '25',
		value: 25,
	},
	{
		text: 'All',
		value: employeeRecords.length,
	},
]

const Report = () => {
	const [filterToggle , setFilterToggle] = useState(false)

	const filterToggleHandler = () => {
		setFilterToggle(!filterToggle)
	}
	return (
		<>
			<PageBreadcrumb title="Report" subName="Dashboards" />
			<div>
				{/* <h4 className="header-title">Pagination &amp; Sort</h4> */}
				<FormInput
					name="select"
					label="Select Report"
					type="select"
					containerClass="mb-3"
					className="form-select"
					// register={register}
					key="select"
					// errors={errors}
					// control={control}
				>
					<option defaultValue="selected">Order</option>
					<option>Inventory</option>
					<option>Supplier</option>
				</FormInput>
			</div>

			<div
				className="d-flex justify-content-between mt-4"
				style={{ marginTop: '10px' }}>
				<div className="d-flex gap-1">
					<Button className="btn-outline-primary"  onClick={filterToggleHandler}>
						<i className="ri-equalizer-line me-1" /> filter
					</Button>
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

				


				<div className="d-flex gap-1">
					<Button variant="danger">
						<i className="ri-file-pdf-line me-1" /> <span>PDF</span>
					</Button>
					<Button variant="success">
						<i className="ri-file-excel-line me-1" /> <span>excel</span>
					</Button>
					<Button variant="secondary">
						<i className="ri-printer-line me-1" /> <span>Print</span>
					</Button>
				</div>
			</div>

					{/* filter  */}
					<Card className={`mt-3 ${!filterToggle ? "d-none" : ""}`}>
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
			</Card>
			{/* filter end */}

			{/* Data table  */}
			<div className="mt-3">
				<Row>
					<Col>
						<Card>
							<Card.Header className="d-flex  justify-content-between">
								<div>
									<h4 className="header-title">Pagination &amp; Sort</h4>
									<p className="text-muted mb-0">
										A simple example of table with pagination and column sorting
									</p>
								</div>
								<div>
									{/* <Button className="btn-outline-dark">
										<i className="ri-money-pound-circle-line me-1" /> Add Order
									</Button> */}
								</div>
							</Card.Header>
							<Card.Body>
								<Table<Employee>
									columns={columns}
									data={employeeRecords}
									pageSize={5}
									sizePerPageList={sizePerPageList}
									isSortable={true}
									pagination={true}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Report
