import { PrivateSSP, getServerSideProps as ssp } from 'components/Private'
import { withAuthedUser } from 'modules/auth'

export default PrivateSSP

export const getServerSideProps = withAuthedUser({ role: 'admin' })(ssp)
