import AppError from '../error'
import { purchaseRepository } from '../repositories/contracts/purchaseRepository'
import { userRepository } from '../repositories/contracts/userRepository'

export async function deleteUserByIdHandler(
  id: string,
  userRepository: userRepository,
  purchaseRepository: purchaseRepository
) {
  const userToDelete = await userRepository.getUserById(id)

  if (!userToDelete) {
    throw new AppError('Usuário não encontrado', 404)
  }

  const purchases = await purchaseRepository.getUserPurchases(id)

  if (purchases.length > 0) {
    purchases.forEach(async (purchase) => {
      await purchaseRepository.deletePurchaseFromPurchasesProducts(purchase.id)
    })

    purchases.forEach(async (purchase) => {
      await purchaseRepository.deletePurchaseById(purchase.id)
    })
  }

  await userRepository.deleteUserFromPurchases(id)

  await userRepository.deleteUser(id)
}
