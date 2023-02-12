class MainCharacter  extends Character
{
  start() {
    if (this.started) {
      return;
    }

    this.started = true;
    this.animate();
  }
}
