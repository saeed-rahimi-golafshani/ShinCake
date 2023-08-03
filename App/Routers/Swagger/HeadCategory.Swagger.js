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
 *          description: One Time Password (OTP) login
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