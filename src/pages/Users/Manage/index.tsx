import { FormInput, PageBreadcrumb } from '@/components'
import {
	Button,
	Card,
	Col,

	Modal,
	Row,

	Spinner,
} from 'react-bootstrap'
import { useModal } from '@/hooks'

import { Table } from 'react-bootstrap'
import { toast } from "react-toastify";

import { useState } from 'react'

import { useRegisterMutation } from '@/api/AuthSlice'
import { useGetAllUserQuery } from '@/api/UserSlice';






const Manage = () => {
	// const [filterToggle, setFilterToggle] = useState(false)

	const [isModelOpen, setIsModelOpen] =  useState(false)

	const [firstName, setFirstName] = useState<string>()
	const [lastName, setLastName] = useState<string>()
	const [email, setEmail] = useState<string>()
	const [contact, setContact] = useState<string>()
	const [status, setStatus] = useState("deactive")
	const [type, setType] = useState("user")
	const [username, setUsername] = useState<string>()
	const [password, setPassword] = useState<string>()

	const [register, { isLoading : registerLoading  }] = useRegisterMutation();
	const { data: AllUser, refetch: AllUserReFetch } = useGetAllUserQuery(undefined)

	const handleSignUp = async () => {

		if (!firstName || !lastName || !email || !contact || !status || !type || !username || !password) {
			toast.error("All fields are required");
			return;
		}

		const userData = {
			firstName,
			lastName,
			email,
			contact,
			status,
			type,
			username,
			password,
		};
	
		try {
			const result = await register(userData).then(
			);
			
			
			if (result.data) {
				AllUserReFetch();
				setFirstName(undefined);
				setLastName(undefined);
				setEmail(undefined);
				setContact(undefined);
				setStatus('deactive');
				setType('user');
				setUsername(undefined);
				setPassword(undefined);
				toast.success("User Added");
				setIsModelOpen(false)
			} else if (result.error) {
				toast.error("Server Error");
			}
		} catch (err) {
			console.error('Failed to register user:', err);
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

	// const filterToggleHandler = () => {
	// 	setFilterToggle(!filterToggle)
	// }
	// const onChangeMultipleSelection = (selected: any) => {
	// 	setMultiSelections(selected)
	// }

	return (
		<>
			<PageBreadcrumb title="User Manage" subName="User" />

			<div
				className="d-flex justify-content-between"
				style={{ marginTop: '10px' }}>
				<div className="d-flex gap-1">
					{/* <Button className="btn-outline-primary" onClick={filterToggleHandler}>
						<i className="ri-equalizer-line me-1" /> filter
					</Button> */}
					{/* <form>
						<div className="input-group">
							<input
								type="search"
								className="form-control"
								placeholder="Search..."
							/>
						</div>
					</form> */}
				</div>
			</div>

			

			{/* Data table  */}
			<Card className="mt-3">
				<Card.Header className="d-flex justify-content-between">
			
					<div>
						<h4 className="header-title">User Tabel</h4>
					</div>
					<Button
						className="btn-outline-dark"
						onClick={() => setIsModelOpen(true)}>
						<i className="ri-user-add-line me-1" /> Add User
					</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive className="mb-0">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Cashier Name</th>
								<th scope="col">Mobile Number</th>
								<th scope="col">Role</th>
								<th scope="col">Status</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{(AllUser || []).map((data:any, index:number) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{data?.firstName}{' '}{data?.lastName}</td>
										<td>
											{data?.contact}
										</td>
										<td>{data?.type}</td>
										<td>{data?.status}</td>
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
				<Modal.Header  >
					<Modal.Title as="h4">Add Inventory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="grid-structure">
						<Row className="mt-2">
							<Col lg={12}>
								<Row>
									<Col lg={12}>
										<FormInput
											label="Firstname"
											type="text"
											name="firstname"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Lastname"
											type="text"
											name="lastname"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Username"
											type="text"
											name="username"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={true}
											// control={control}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Password"
											type="text"
											name="password"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={true}
											// control={control}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											label="Email"
											type="email"
											name="email"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>

									<Col lg={12}>
										<FormInput
											label="Contact"
											type="text"
											name="Contact"
											containerClass="mb-3"
											// register={register}
											key="text"
											// errors={errors}
											// control={control}
											onChange={(e) => setContact(e.target.value)}
										/>
									</Col>
									<Col lg={12}>
										<FormInput
											name="Role"
											label="Role"
											type="select"
											containerClass="mb-3"
											className="form-select"
											// register={register}
											key="select"
											// errors={errors}
											// control={control}
											onChange={(e) => setType(e.target.value)}
											>
											<option defaultValue="selected">user</option>
											<option>admin</option>
											<option>manager</option>
											
										</FormInput>
									</Col>
									<Col lg={12}>
										<FormInput
											name="Status"
											label="Status"
											type="select"
											containerClass="mb-3"
											className="form-select"
											// register={register}
											key="select"
											// errors={errors}
											// control={control}
											onChange={(e) => setStatus(e.target.value)}
											>
											<option defaultValue="selected">deactive</option>
											<option>active</option>
											<option>delete</option>
											<option>band</option>
											
										</FormInput>
									</Col>
									
								</Row>
							</Col>

							<Col lg={6}></Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={()=>setIsModelOpen(false)}>
						Close
					</Button>
					{/* <Button variant="primary" onClick={toggleStandard}>
						Print
					</Button> */}
					<Button variant="primary" onClick={handleSignUp}>
						{registerLoading ? (<Spinner className="" size="sm" />) : "Save"}
					
					</Button>
				</Modal.Footer>
			</Modal>
			{/* model  */}
		</>
	)
}

export default Manage
