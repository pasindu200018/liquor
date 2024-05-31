import { FormInput, PageBreadcrumb } from '@/components'
import {
	Button,
	Card,
	Col,

	Modal,
	Row,

	Table,
	Spinner,
} from 'react-bootstrap'

import { useState } from 'react'
import { useModal } from '@/hooks'

import {  useGetAllItemQuery } from '@/api/ItemSlice'
import { toast } from 'react-toastify'
import {
	useCreateAInventoryMutation,
	useGetAllInventoryQuery,
} from '@/api/inventorySlice'
import { useGetAllSupplierQuery } from '@/api/supplierSlice'





const Inventory = () => {
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [filterToggle, setFilterToggle] = useState(false)




	const [supplierId, setSupplierId] = useState('')



	const [brandId, setBrandId] = useState('')
	const [discription, setDescription] = useState('')
	const [createBy, setCreateBy] = useState('')
	const [updateBy, setUpdateBy] = useState('')

	const [image, setImage] = useState('')
	const [QTY, setQty] = useState('')
	

	const { data: allSuppliers } =
		useGetAllSupplierQuery(undefined)
	const { data: AllItemm} = useGetAllItemQuery(undefined)
	const { data: AllItem, refetch: AllInventoryReFetch } =
		useGetAllInventoryQuery(undefined)




	console.log(AllItemm)

	// const { data: AllItem, refetch: AllItemReFetch } = useGetAllItemQuery()
	const [
		createAInventory,
		{ isLoading: itemLoading},
	] = useCreateAInventoryMutation()

	const handleItemSave = async () => {
		// if (!supplier || !brandId || !QTY || !createBy || !updateBy ) {
		// 	toast.error('All fields are required')
		// 	return
		// }

		const itemData = {
			supplierId,
			brandId,
			discription,
			createBy,
			updateBy,
			image,
			QTY,
		}

		try {
			const result = await createAInventory(itemData)

			if (result.data) {
				toast.success('Item Added')
				setIsModelOpen(false)
				AllInventoryReFetch()
			} else if (result.error) {
				toast.error('Server Error')
			}
		} catch (err) {
			console.error('Failed to create item:', err)
			toast.error('Server Error')
		}
	}

	const {
		size,

		scroll,
		toggleModal,
	} = useModal()
	const filterToggleHandler = () => {
		setFilterToggle(!filterToggle)
	}
	return (
		<>
			<PageBreadcrumb title="Inventory" subName="Dashboards" />

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

			{/* Data table  */}
			<Card className="mt-3">
				<Card.Header className="d-flex justify-content-between">
					<div>
						<h4 className="header-title">Inventory table</h4>
					</div>
					<Button
						className="btn-outline-dark"
						onClick={() => setIsModelOpen(true)}>
						<i className="ri-user-add-line me-1" /> Add Inventory
					</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive className="mb-0">
						<thead>
							<tr>
								<th scope="col">no</th>
								<th scope="col">ItemID</th>
								<th scope="col">CreateBy</th>
								<th scope="col">updateBy</th>
								{/* <th scope="col">Description</th> */}
								<th scope="col">QTY</th>
							</tr>
						</thead>
						<tbody>
							{(AllItem || []).map((data: any, index: number) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{data?.brandId}</td>
										<td>{data?.createBy}</td>
										<td>{data?.updateBy}</td>
										{/* <td>{data?.description}</td> */}
										<td>{data?.qty}</td>
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
										{/* <FormInput
									label="Supplier"
									type="text"
									name="text"
									containerClass="mb-3"
									key="text"
									onChange={(e) => setSupplier(e.target.value)}
								/> */}
										<Col lg={12}>
											<FormInput
												name="select"
												label="Suppler "
												type="select"
												containerClass="mb-3"
												className="form-select"
												key="select"
												onChange={(e) => setSupplierId(e.target.value)}>
												{(allSuppliers || []).map((data: any) => (
													<option value={data.id}>{data.supplier_name}</option>
												))}
											</FormInput>
										</Col>
									</Col>
									<Col lg={12}>
										{/* <FormInput
											label="Item Id"
											type="text"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setBrandId(e.target.value)}
										/> */}
										<FormInput
											name="select"
											label="Item Id"
											type="select"
											containerClass="mb-3"
											className="form-select"
											key="select"
											onChange={(e) => setBrandId(e.target.value)}>
											{(AllItemm || []).map((data:any) => (
												<option value={data.itemId}>{data.name}</option>
											))}
										</FormInput>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Description"
											type="text"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setDescription(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Image URL"
											type="text"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setImage(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Create By"
											type="text"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setCreateBy(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="UpdateBy"
											type="text"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setUpdateBy(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="QTY"
											type="number"
											name="text"
											containerClass="mb-3"
											key="text"
											onChange={(e) => setQty(e.target.value)}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={() => setIsModelOpen(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={handleItemSave}>
						{itemLoading ? <Spinner className="" size="sm" /> : 'Save'}
					</Button>
				</Modal.Footer>
			</Modal>
			{/* model  */}
		</>
	)
}

export default Inventory
