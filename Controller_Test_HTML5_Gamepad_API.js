window.addEventListener("gamepadconnected", function(e) {
  var gamepad = navigator.getGamepads()[e.gamepad.index];
  var statusEl = document.getElementById("status");
  statusEl.innerHTML = "Gamepad connected. Move the thumbsticks and press the buttons and triggers to test for non-deadzone area and deadzone.";

  function update() {
    gamepad = navigator.getGamepads()[e.gamepad.index];
    var leftStick = gamepad.axes[0] + gamepad.axes[1];
    var rightStick = gamepad.axes[2] + gamepad.axes[3];
    var buttons = gamepad.buttons;

    var nonDeadzoneDetected = false;
    var deadzoneDetected = false;

    if (Math.abs(leftStick) > 0.1 || Math.abs(rightStick) > 0.1) {
      nonDeadzoneDetected = true;
    }

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].value > 0.1) {
        nonDeadzoneDetected = true;
      }
      if (buttons[i].value < 0.1) {
        deadzoneDetected = true;
      }
    }

    if (nonDeadzoneDetected && !deadzoneDetected) {
      statusEl.innerHTML = "Non-deadzone area detected!";
    } else if (!nonDeadzoneDetected && deadzoneDetected) {
      statusEl.innerHTML = "Deadzone detected!";
    } else {
      statusEl.innerHTML = "Move the thumbsticks and press the buttons and triggers to test for non-deadzone area and deadzone.";
    }

    requestAnimationFrame(update);
  }

  update();
});

window.addEventListener("gamepaddisconnected", function(e) {
  var statusEl = document.getElementById("status");
  statusEl.innerHTML = "Gamepad disconnected.";
});
