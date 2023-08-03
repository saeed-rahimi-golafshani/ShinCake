/**
 * @swagger
 *  definitions:
 *      ListOfHeadCategory:
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
 *                                      example: "title of headcategory"             
 */

/**
 * @swagger 
 *  components:
 *      schemas:
 *          Create_HeadCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the headcategory title for Admin panel
 *          CheckLogin:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for Check Login
 *                  code: 
 *                      type: string
 *                      description: the Otp code
 *          refreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties: 
 *                  refreshToken:
 *                      type: string
 *                      description: the refreshToken
 */

/**
 * @swagger 
 *  /admin/headcategory/create: 
 *      post: 
 *          tags: [Admin-HeadCategory]
 *          summary: create headcategory In admin
 *          description: create headcategory In admin
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Create_HeadCategory' 
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
 *  /admin/headcategory/list: 
 *      get: 
 *          tags: [Admin-HeadCategory]
 *          summary: list of headcategory In admin
 *          description: create headcategory In admin
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
 *  /admin/headcategory/list/{id}: 
 *      get: 
 *          tags: [Admin-HeadCategory]
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