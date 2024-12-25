import { doLogOut } from "@/actions/index"

const Logout = () => {
  return (
    <form action={doLogOut}>
        <button className="bg-blue-400 my-2 text-white p-1 rounded" type="submit">Logout</button>
    </form>
  )
}

export default Logout