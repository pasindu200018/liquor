import { FormInput, PageBreadcrumb } from '@/components'
import {
	Button,
	Card,
	Col,
	FloatingLabel,
	Modal,
	Row,
	Form,
	Table,
	Spinner
} from 'react-bootstrap'
// import { employeeRecords } from './data'
// import { Column } from 'react-table'
// import { PageSize } from '@/components'
import { useState } from 'react'
import { useModal} from '@/hooks'

import { useCreateAItemMutation } from '@/api/ItemSlice'
import { toast } from 'react-toastify'
import { useGetAllOrderQuery } from '@/api/orderSlice'





const Order= () => {
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [filterToggle, setFilterToggle] = useState(false)

	const [name, setName] = useState('')
	const [brand, setBrand] = useState('')
	const [qty, setQty] = useState('')
	const [unitPrice, setUnitPrice] = useState('')
	const [manufactureDate, setManufactureDate] = useState('')
	const [expireDate, setExpireDate] = useState('')
	const [userId, setUserId] = useState('177f61b8-3d99-44ff-aef5-2e6603ae039a')
	const [supplierId, setSupplierId] = useState('')
	const [description, setDescription] = useState('')
	
	

	const { data: AllItem, refetch: AllItemReFetch } =  useGetAllOrderQuery(undefined)

	const [createAItem, { isLoading : itemLoading }] = useCreateAItemMutation();
	console.log(AllItem)
	

	const handleItemSave = async () => {

		if (!name || !brand || !qty || !unitPrice || !manufactureDate || !expireDate || !supplierId || !description) {
			toast.error("All fields are required");
			return;
		}

		const itemData = {
			name, brand, qty, unitPrice, manufactureDate,expireDate, userId,supplierId,description
		};
	
		try {
			const result = await createAItem(itemData)
			
			if (result.data) {
				setName('')
				setBrand('')
				setQty('')
				setUnitPrice('')
				setManufactureDate('')
				setUserId('177f61b8-3d99-44ff-aef5-2e6603ae039a')
				setExpireDate('')
				setSupplierId('')
				setDescription('')
				toast.success("Item Added");
				setIsModelOpen(false)
				AllItemReFetch()
			} else if (result.error) {
				toast.error("Server Error");
			}
		} catch (err) {
			console.error('Failed to create item:', err);
			toast.error("Server Error");
		}
	};




	const {
		// isOpen,
		size,
		// className,
		scroll,
		toggleModal,
		// openModalWithSize,
		// openModalWithClass,
		// openModalWithScroll,
	} = useModal()
	const filterToggleHandler = () => {
		setFilterToggle(!filterToggle)
	}
	return (
		<>
			<PageBreadcrumb title="Order" subName="Dashboards" />

			<div
				className="d-flex justify-content-between"
				style={{ marginTop: '10px' }}>
				<div className="d-flex gap-1">
					<Button className="btn-outline-primary" onClick={filterToggleHandler}>
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
			<Card className={`mt-3 ${!filterToggle ? 'd-none' : ''}`}>
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
			<Card className="mt-3">
				<Card.Header className="d-flex justify-content-between">
					<div>
						<h4 className="header-title">Order table</h4>
					</div>
					{/* <Button
						className="btn-outline-dark"
						onClick={() => setIsModelOpen(true)}>
						<i className="ri-user-add-line me-1" /> Add Item
					</Button> */}
				</Card.Header>
				<Card.Body>
					<Table responsive className="mb-0">
						<thead>
							<tr>
								<th scope="col">Order Id</th>
								<th scope="col">Items</th>
								<th scope="col">Create Date</th>
								
							</tr>
						</thead>
						<tbody>
							{(AllItem || []).map((data:any , index: number) => {
								return (
									<tr key={index}>
										<td>{data.placeOrderId}</td>
										<td>{data.items.length}</td>
										<td>{data.createDate}</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			{/* Data table  */}

			{/* model  */}
			<Modal
				className="fade"
				show={isModelOpen}
				onHide={toggleModal}
				dialogClassName="lg"
				size={size}
				scrollable={scroll}>
				<Modal.Header >
					<Modal.Title as="h4">Add Inventory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="grid-structure">
						<Row className="mt-2">
							<Col lg={12}>
								<Row>
									<Col lg={12}>
										<FormInput
											label="Name"
											type="text"
											name="text"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e)=>setName(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											name="select"
											label="Suppler "
											type="select"
											containerClass="mb-3"
											className="form-select"
											key="select"
											onChange={(e)=>setSupplierId(e.target.value)}
											>
											<option >177f61b8-3d99-44ff-aef5-2e6603ae039a</option>
											<option>177f61b8-3d99-44ff-aef5-2e6603ae039a</option>
											<option>177f61b8-3d99-44ff-aef5-2e6603ae039a</option>
											<option>4</option>
											<option>5</option>
										</FormInput>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Brand"
											type="text"
											name="text"
											containerClass="mb-3"
											// register={register}
											key="text"
											onChange={(e)=>setBrand(e.target.value)}
											// errors={errors}
											// control={control}
										/>
									</Col>
									<Col lg={6}>
										<FormInput
											label="QTY"
											type="Number"
											name="text"
											containerClass="mb-3"
											// register={register}
											key="text"
											onChange={(e)=>setQty(e.target.value)}
											// errors={errors}
											// control={control}
										/>
									</Col>
									<Col lg={6}>
										<FormInput
											label="Unit Price"
											type="number"
											name="text"
											containerClass="mb-3"
											onChange={(e)=>setUnitPrice(e.target.value)}
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
										/>
									</Col>
									<Col lg={6}>
										<FormInput
											label="Manufacture Date"
											type="date"
											name="text"
											containerClass="mb-3"
											// register={register}
											key="text"
											onChange={(e)=>setManufactureDate(e.target.value)}
											// errors={errors}
											// control={control}
										/>
									</Col>
									<Col lg={6}>
										<FormInput
											label="Expire Date"
											type="date"
											name="text"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e)=>setExpireDate(e.target.value)}
										/>
									</Col>
									{/* <Col lg={6}>
										<h5>Brand</h5>
										<FloatingLabel
											controlId="floatingSelect"
											label="Payment Method"
											className="mb-3">
											<Form.Select aria-label="Floating label select example">
												<option defaultValue="selected">Cash</option>
												<option defaultValue="1">Card</option>
												
											</Form.Select>
										</FloatingLabel>
									</Col> */}

									<Col lg={12} className="">
										<h5>
											Description 
										</h5>
										<Row>
											<Col lg={6}>
												<FloatingLabel
													controlId="floatingTextarea2"
													label="Order Description"
													>
													<Form.Control
														onChange={(e)=>setDescription(e.target.value)}
														as="textarea"
														placeholder="Leave a comment here"
														style={{ height: '100px' }}
													/>
												</FloatingLabel>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>

							<Col lg={6}></Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={() => setIsModelOpen(false)}>
					Close
					</Button>
					<Button variant="primary" onClick={handleItemSave}>
					{itemLoading? (<Spinner className="" size="sm" />) : "Save"}
					</Button>
				</Modal.Footer>
			</Modal>
			{/* model  */}
		</>
	)
}

export default Order
