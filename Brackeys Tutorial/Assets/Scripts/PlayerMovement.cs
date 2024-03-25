using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    /* Using public Rigidbody rb; creates a reference to a component (Rigidbody in this case).
    This way you can edit values of that specific component. */
    public Rigidbody rb;

    public float forwardForce = 2000f;
    public float sidewaysForce = 500f;

    // Update is called once per frame
    // Unity works better with FixedUpdate instead of Update for calculating physics.
    void FixedUpdate() /* Fixed Update is fine for current tutorial about input, but when using it for Jumping or other one-off events its not the right thing to use.
                       Input is updated in the update method and if the fixed update runs slower you might encounter a situation where you actually miss some player input. */

    {
   
    rb.AddForce(0, 0, forwardForce * Time.deltaTime); // rb.AddForce adds force on the x/y/z axis. Increasing or decreasing this value adds a certain force to one or more of the axis's 
    // Time.deltaTime requires more elaboration.

    if ( Input.GetKey("d") )// Only executed if condition is met 
        {
        rb.AddForce(sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
            /* Input.GetKey is fine for the tutorial, but if you want to do stuff like:
               - Smoothing player input
               - Supporting alternative keys
               - Supporting a controller
            Then you need to look into that to improve your code and options */
        }

    if (Input.GetKey("a") )
        {
            rb.AddForce(-sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
        }
    }
} 