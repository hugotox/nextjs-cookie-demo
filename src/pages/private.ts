import { Private } from 'components/Private'
import { withAuthedUser } from 'modules/auth'

export default Private

// withAuthedUser makes the page private, redirects to login when user is not authed
export const getServerSideProps = withAuthedUser()()
