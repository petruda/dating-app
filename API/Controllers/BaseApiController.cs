using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

    [Route("api/[controller]")] // create route for the api EX : //HTTPS:LOCALHOST:5001/API/USERS not with caps lock
    [ApiController]
public class BaseApiController : ControllerBase
{

}
