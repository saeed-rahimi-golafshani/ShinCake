/**
 * @swagger
 *  definitions:
 *      ListOfCategory:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      courses:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of category"    
 *                                  headCategory:
 *                                      type: string
 *                                      example: "title of category"             
 *                                  parent:
 *                                      type: string
 *                                      example: "title of category"                      
 */

/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_Category: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the create title for Admin panel
 *                  headCategory: 
 *                      type: string
 *                      description: the create headCategory title for Admin panel
 *                  parent: 
 *                      type: string
 *                      description: the create parent title for Admin panel
 *          Update_Category:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the update headcategory title for Admin panel
 *                  headCategory: 
 *                      type: string
 *                      description: the create headCategory title for Admin panel
 *                  parent: 
 *                      type: string
 *                      description: the create parent title for Admin panel
 */

/**
 * @swagger 
 *  /admin/category/create: 
 *      post: 
 *          tags: [Admin-Category]
 *          summary: create Category In admin
 *          description: create Category In admin
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Create_Category' 
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'        
 */
/**
 * @swagger 
 *  /admin/category/list: 
 *      get: 
 *          tags: [Admin-Category]
 *          summary: list of category In admin
 *          description: list category In admin
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfCategory'        
 */
/**
 * @swagger 
 *  /admin/category/list_with_children: 
 *      get: 
 *          tags: [Admin-Category]
 *          summary: list of category In admin
 *          description: list category In admin
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfCategory'        
 */
/**
 * @swagger 
 *  /admin/category/list/{id}: 
 *      get: 
 *          tags: [Admin-Category]
 *          summary: list of headcategory In admin
 *          description: create headcategory In admin
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfHeadCategory'        
 */
/**
 * @swagger 
 *  /admin/category/update/{id}: 
 *      patch: 
 *          tags: [Admin-Category]
 *          summary: create category In admin
 *          description: create category In admin
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Update_Category' 
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'        
 */
/**
 * @swagger 
 *  /admin/category/remove/{id}: 
 *      delete: 
 *          tags: [Admin-Category]
 *          summary: create category In admin
 *          description: create category In admin
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'        
 */