import { FormInput, PageBreadcrumb } from '@/components'
import { Button, Card, Col, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { useModal } from '@/hooks'
import { toast } from 'react-toastify'
import { useState } from 'react'

import {
	useCreateASupplierMutation,
	useGetAllSupplierQuery,
} from '@/api/supplierSlice'

const Supplier = () => {
	// const [filterToggle, setFilterToggle] = useState(false)

	// const [isStandardOpen, toggleStandard] = useToggle()
	const [isModelOpen, setIsModelOpen] = useState(false)

	const [item_id, setItem_id] = useState('177f61b8-3d99-44ff-aef5-2e6603ae039a')
	const [supplier_name, setSupplierName] = useState('')
	const [contact, setContact] = useState('')
	const [email, setEmail] = useState('')
	const [qty_received_items, setQtyReceivedItems] = useState('')
	const [qty_returned_items, setQtyReturnedItems] = useState('')
	const [total_qty, setTotalQty] = useState('')
	const [buying_price, setBuyingPrice] = useState('')
	const [payment, setPayment] = useState('')
	const [status, setStatus] = useState('paid')
	const [payment_method, setPayment_method] = useState('paid')

	const [
		createASupplier,
		{
			isLoading: registerLoading,

		},
	] = useCreateASupplierMutation()
	const { data: allSuppliers, refetch: allSuppliersReFetch } =
		useGetAllSupplierQuery(undefined)

	const handleAddSupplier = async () => {
		if (
			!supplier_name ||
			!contact ||
			!email ||
			!qty_received_items ||
			!qty_returned_items ||
			!total_qty ||
			!buying_price ||
			!payment ||
			!status
		) {
			toast.error('All fields are required')
			return
		}

		const supplyData = {
			
			item_id,
			supplier_name,
			contact,
			email,
			status,
			qty_received_items,
			qty_returned_items,
			total_qty,
			buying_price,
			payment,
			payment_method,
		}

		try {
			const result = await createASupplier(supplyData)
			if (result.data) {
				allSuppliersReFetch()
				setItem_id('177f61b8-3d99-44ff-aef5-2e6603ae039a')
				setSupplierName('')
				setStatus('paid')
				setPayment_method('paid')
				setContact('')
				setEmail('')
				setQtyReceivedItems('')
				setQtyReturnedItems('')
				setTotalQty('')
				setBuyingPrice('')
				toast.success('Supplier Added')
				setIsModelOpen(false)
			} else if (result.error) {
				toast.error('Server Error')
			}
		} catch (err) {
			console.error('Failed to register supplier:', err)
			toast.error('Server Error')
		}
	}

	const {  size, scroll } = useModal()

	
	// console.log(allSuppliers)
	return (
		<>
			<PageBreadcrumb title="Supplier" subName="User" />

			<div
				className="d-flex justify-content-between"
				style={{ marginTop: '10px' }}>
				<div className="d-flex gap-1">
					{/* <Button className="btn-outline-primary" onClick={() => setFilterToggle(!filterToggle)}>
            <i className="ri-equalizer-line me-1" /> Filter
          </Button>
          <form>
            <div className="input-group">
              <input type="search" className="form-control" placeholder="Search..." />
            </div>
          </form> */}
				</div>
			</div>

			{/* Data table */}
			<Card className="mt-3">
				<Card.Header className="d-flex justify-content-between">
					<div>
						<h4 className="header-title">Supplier Table</h4>
					</div>
					<Button
						className="btn-outline-dark"
						onClick={() => setIsModelOpen(true)}>
						<i className="ri-user-add-line me-1" /> Add Supplier
					</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive className="mb-0">
						<thead>
							<tr>
								<th scope="col">No</th>
								<th scope="col">Supplier Name</th>
								<th scope="col">Contact</th>
								<th scope="col">Email</th>
							</tr>
						</thead>
						<tbody>
							{(allSuppliers || []).map((data: any, index: number) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{data.supplier_name}</td>
									<td>{data.contact}</td>
									<td>{data.email}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			{/* Data table */}
			{/* Modal */}
			<Modal
				className="fade"
				show={isModelOpen}
				onHide={() => setIsModelOpen(false)}
				dialogClassName="lg"
				size={size}
				scrollable={scroll}>
				<Modal.Header closeButton>
					<Modal.Title as="h4">Add Supplier</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="grid-structure">
						<Row className="mt-2">
							<Col lg={12}>
								<Row>
									<Col lg={12}>
										<FormInput
											label="Supplier Name"
											type="text"
											name="supplierName"
											containerClass="mb-3"
											onChange={(e) => setSupplierName(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Contact"
											type="text"
											name="contact"
											containerClass="mb-3"
											onChange={(e) => setContact(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Email"
											type="email"
											name="email"
											containerClass="mb-3"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Qty Received Items"
											type="number"
											name="qtyReceivedItems"
											containerClass="mb-3"
											onChange={(e) => setQtyReceivedItems(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Qty Returned Items"
											type="number"
											name="qtyReturnedItems"
											containerClass="mb-3"
											onChange={(e) => setQtyReturnedItems(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Total Qty"
											type="number"
											name="totalQty"
											containerClass="mb-3"
											onChange={(e) => setTotalQty(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Buying Price"
											type="number"
											name="buyingPrice"
											containerClass="mb-3"
											onChange={(e) => setBuyingPrice(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Payment"
											type="number"
											name="payment"
											containerClass="mb-3"
											onChange={(e) => setPayment(e.target.value)}
										/>
									</Col>
									{/* <Col lg={12}>
										<FormInput
											label="Status"
											type="select"
											name="status"
											containerClass="mb-3"
											className="form-select"
											onChange={(e) => setStatus(e.target.value)}>
											<option value="">Select Status</option>
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</FormInput>
									</Col> */}
								</Row>
							</Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={() => setIsModelOpen(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddSupplier}>
						{registerLoading ? <Spinner size="sm" /> : 'Save'}
					</Button>
				</Modal.Footer>
			</Modal>
			{/* Modal */}
		</>
	)
}

export default Supplier
