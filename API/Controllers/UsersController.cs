using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")] // create route for the api EX : //HTTPS:LOCALHOST:5001/API/USERS not with caps lock
public class UsersController : ControllerBase
{
    private readonly DataContext _context;
    public UsersController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = _context.Users.ToList();
        return users;
    }
    [HttpGet("{id}")]
    public ActionResult<AppUser> GetUser(int id)
    {
        return _context.Users.Find(id);
       
    }
}
