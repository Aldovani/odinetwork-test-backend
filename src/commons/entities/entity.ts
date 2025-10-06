export abstract class Entity<Props, ID> {
  private _id: ID | undefined
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props
    this._id = id ?? undefined
  }

  public equals(entity: Entity<unknown, unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
