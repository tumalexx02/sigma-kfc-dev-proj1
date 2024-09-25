import { Button } from '../../components/Button/Button'
import { useUserStore } from '../../stores/user.store'

function MainLayout () {
  const logout = useUserStore(state => state.logout);

  return (
    <Button size='big' onClick={logout}>Выйти</Button>
  )
}

export default MainLayout