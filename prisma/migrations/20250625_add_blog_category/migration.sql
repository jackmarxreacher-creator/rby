
[+] Added enums
  - Role
  - BusinessType
  - OrderStatus
  - Category
  - GalleryItemType
  - BlogCategory

[+] Added tables
  - User
  - Customer
  - Order
  - OrderItem
  - Product
  - Session
  - Account
  - Verification
  - GalleryItem
  - BlogPost

[*] Changed the `Account` table
  [+] Added unique index on columns (providerId, accountId)
  [+] Added foreign key on columns (userId)

[*] Changed the `BlogPost` table
  [+] Added unique index on columns (slug)
  [+] Added index on columns (slug)
  [+] Added index on columns (isPublished)

[*] Changed the `Customer` table
  [+] Added unique index on columns (email)
  [+] Added index on columns (createdById)
  [+] Added index on columns (updatedById)
  [+] Added foreign key on columns (createdById)
  [+] Added foreign key on columns (updatedById)

[*] Changed the `GalleryItem` table
  [+] Added foreign key on columns (createdById)
  [+] Added foreign key on columns (updatedById)
  [+] Added foreign key on columns (deletedById)

[*] Changed the `Order` table
  [+] Added index on columns (createdById)
  [+] Added index on columns (editedById)
  [+] Added index on columns (processedById)
  [+] Added foreign key on columns (customerId)
  [+] Added foreign key on columns (createdById)
  [+] Added foreign key on columns (editedById)
  [+] Added foreign key on columns (processedById)

[*] Changed the `OrderItem` table
  [+] Added foreign key on columns (orderId)
  [+] Added foreign key on columns (productId)

[*] Changed the `Session` table
  [+] Added unique index on columns (token)
  [+] Added foreign key on columns (userId)

[*] Changed the `User` table
  [+] Added unique index on columns (email)
  [+] Added unique index on columns (phoneNumber)

[*] Changed the `Verification` table
  [+] Added unique index on columns (identifier, value)
