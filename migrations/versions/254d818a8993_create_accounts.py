"""create accounts

Revision ID: 254d818a8993
Revises: 10d48fe3c6da
Create Date: 2024-12-01 18:30:52.164439

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '254d818a8993'
down_revision: Union[str, None] = '10d48fe3c6da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
    sa.Column('last_name', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
    sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(length=256), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
